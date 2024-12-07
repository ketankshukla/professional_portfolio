import argparse
import os
import re
import shutil
from datetime import datetime
import markdown
from bs4 import BeautifulSoup

def format_markdown(input_file, output_file=None):
    """
    Format a markdown file to ensure it's compatible with our blog renderer.
    Adds necessary metadata and fixes common formatting issues.
    """
    if not output_file:
        output_file = input_file

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Convert markdown to HTML first to handle any markdown syntax
    html_content = markdown.markdown(content, extensions=['fenced_code', 'tables'])
    
    # Convert back to markdown-style content but with proper formatting
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Process headings and add emojis
    for heading in soup.find_all(['h1', 'h2', 'h3']):
        if not any(char in heading.text for char in ['🔗', '📝', '💡', '🚀', '📊', '🎯', '💻']):
            emoji = get_emoji_for_heading(heading.text.lower())
            heading.string = f"{emoji} {heading.text}"

    # Convert back to markdown-style content
    content = html_to_markdown(soup)

    # Fix Mermaid diagram syntax
    content = fix_mermaid_syntax(content)

    # Add code block language if missing
    content = fix_code_blocks(content)

    # Save the formatted content
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)

    return output_file

def html_to_markdown(soup):
    """Convert HTML back to markdown-style content."""
    content = []
    for element in soup.children:
        if element.name == 'h1':
            content.append(f"# {element.text.strip()}\n")
        elif element.name == 'h2':
            content.append(f"## {element.text.strip()}\n")
        elif element.name == 'h3':
            content.append(f"### {element.text.strip()}\n")
        elif element.name == 'p':
            content.append(f"{element.text.strip()}\n")
        elif element.name == 'pre':
            code = element.find('code')
            if code:
                lang = code.get('class', [''])[0].replace('language-', '') or 'text'
                content.append(f"```{lang}\n{code.text.strip()}\n```\n")
        elif element.name == 'ul':
            for li in element.find_all('li'):
                content.append(f"- {li.text.strip()}\n")
        elif element.name == 'ol':
            for i, li in enumerate(element.find_all('li'), 1):
                content.append(f"{i}. {li.text.strip()}\n")
    return '\n'.join(content)

def get_emoji_for_heading(heading):
    """Return an appropriate emoji based on the heading content."""
    emoji_map = {
        'introduction': '🌟',
        'implementation': '💻',
        'example': '🎮',
        'practice': '🎯',
        'advanced': '🚀',
        'conclusion': '🎬',
        'features': '✨',
        'structure': '🏗️',
        'usage': '🛠️',
        'overview': '📖',
        'summary': '📝',
        'installation': '⚙️',
        'configuration': '⚙️',
        'setup': '🔧',
        'tutorial': '📚',
        'guide': '🗺️',
        'tips': '💡',
        'best practices': '✅',
        'common': '📊',
        'performance': '⚡',
        'security': '🔒',
        'testing': '🧪',
        'debugging': '🐛',
        'deployment': '🚀',
        'api': '🔌',
        'database': '💾',
        'architecture': '🏛️',
        'design': '🎨',
        'patterns': '🔄',
    }

    for key, emoji in emoji_map.items():
        if key in heading:
            return emoji
    return '📌'  # Default emoji

def fix_mermaid_syntax(content):
    """Fix common Mermaid diagram syntax issues."""
    # Replace flowchart with graph
    content = re.sub(
        r'```mermaid\s*\nflowchart\s',
        '```mermaid\ngraph ',
        content
    )

    # Ensure proper mindmap syntax
    content = re.sub(
        r'```mermaid\s*\nmindmap\s*\n\s*root',
        '```mermaid\nmindmap\n    root',
        content
    )

    return content

def fix_code_blocks(content):
    """Add language hints to code blocks if missing."""
    def replace_code_block(match):
        if match.group(1):  # Already has a language specified
            return match.group(0)
        # Try to detect the language based on content
        code = match.group(2)
        language = detect_language(code)
        return f"```{language}\n{code}```"

    return re.sub(r'```(\w*)\n(.*?)```', replace_code_block, content, flags=re.DOTALL)

def detect_language(code):
    """Simple language detection based on code content."""
    if 'def ' in code or 'class ' in code or 'import ' in code:
        return 'python'
    if '{' in code and (':' in code or ';' in code):
        return 'javascript'
    if '<' in code and '>' in code:
        return 'html'
    if '{' in code and '}' in code and ';' in code:
        return 'css'
    return 'text'

def process_and_move_markdown(markdown_file):
    """
    Process a markdown file from markdown_format/original_articles and move it to assets/blog_posts.
    Returns the path to the processed file in the blog_posts folder.
    """
    # Get the absolute paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    input_path = os.path.join(script_dir, 'original_articles', markdown_file)
    
    # Create a dated filename for the output
    date_prefix = datetime.now().strftime('%Y-%m-%d')
    output_filename = f"{date_prefix}-{markdown_file}"
    blog_posts_dir = os.path.join(os.path.dirname(script_dir), 'assets', 'blog_posts')
    output_path = os.path.join(blog_posts_dir, output_filename)
    
    # Ensure the blog_posts directory exists
    os.makedirs(blog_posts_dir, exist_ok=True)
    
    # Format the markdown file
    format_markdown(input_path, output_path)
    
    return output_path

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process markdown files and move them to blog_posts folder')
    parser.add_argument('filename', help='Name of the markdown file in the markdown_format/original_articles folder')
    
    args = parser.parse_args()
    
    try:
        output_path = process_and_move_markdown(args.filename)
        print(f"Successfully processed and moved markdown file to: {output_path}")
    except Exception as e:
        print(f"Error processing markdown file: {str(e)}")
        exit(1)
