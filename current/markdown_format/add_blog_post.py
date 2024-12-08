import argparse
import os
from datetime import datetime
from bs4 import BeautifulSoup
import re

def extract_title_and_date(markdown_file):
    """Extract title and date from markdown file."""
    with open(markdown_file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extract title (first h1)
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = title_match.group(1) if title_match else "Untitled Post"
    
    # Extract date from filename or use current date
    date_match = re.search(r'(\d{4}-\d{2}-\d{2})', os.path.basename(markdown_file))
    if date_match:
        date = datetime.strptime(date_match.group(1), '%Y-%m-%d')
    else:
        date = datetime.now()
    
    return title, date

def add_blog_post_to_index(markdown_file, image_path=None):
    """Add a new blog post to the index.html file."""
    # Get title and date
    title, date = extract_title_and_date(markdown_file)
    
    # Default image if none provided
    if not image_path:
        image_path = "assets/default_blog.jpg"
    
    # Read the index.html file
    with open('index.html', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Find the articles grid
    articles_grid = soup.find('div', class_='articles-grid')
    if not articles_grid:
        raise ValueError("Could not find articles grid in index.html")
    
    # Create new blog post card
    new_post = soup.new_tag('a')
    new_post['href'] = f"blog-post.html?post={markdown_file}"
    new_post['class'] = 'article-card'
    new_post['data-date'] = date.strftime('%Y-%m-%d')
    
    # Create image div
    image_div = soup.new_tag('div')
    image_div['class'] = 'article-image'
    img = soup.new_tag('img')
    img['src'] = image_path
    img['alt'] = title
    image_div.append(img)
    
    # Create content div
    content_div = soup.new_tag('div')
    content_div['class'] = 'article-content'
    
    # Add title
    h3 = soup.new_tag('h3')
    h3.string = title
    
    # Add date
    p = soup.new_tag('p')
    p['class'] = 'article-date'
    p.string = date.strftime('%B %d, %Y')
    
    # Assemble the card
    content_div.append(h3)
    content_div.append(p)
    new_post.append(image_div)
    new_post.append(content_div)
    
    # Add the new post as the first child of articles-grid
    if articles_grid.contents:
        articles_grid.contents[0].insert_before(new_post)
    else:
        articles_grid.append(new_post)
    
    # Save the modified index.html
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup.prettify()))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Add a blog post to index.html')
    parser.add_argument('markdown_file', help='Path to the processed markdown file')
    parser.add_argument('--image', help='Path to the blog post image (optional)')
    
    args = parser.parse_args()
    
    try:
        add_blog_post_to_index(args.markdown_file, args.image)
        print(f"Successfully added blog post to index.html")
    except Exception as e:
        print(f"Error adding blog post: {str(e)}")
