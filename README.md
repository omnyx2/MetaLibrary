
# Meta Library

Using Nextra, Rust, Fs to make local library stage. Which is easy to deploy and easy to using for isolated network

# Prerequest

1. Install rust in computer.
2. Install npm in computer. 
3. Install Next.js in computer.

# Installation

1. Cloning this repo to local.
```git clone <url>```
2. Go to md-writer and 'npm install',
3. Go to MetaLibarayManager and 'cargo run'
4. Go to library/books and 'npm install && npm run watch-and-dev' this will serve the books
5. if you want you can fix metaconfigs/books so that you can add more books

# Usage md-writer.

md-writer is simple writer that write file in the library/books/{book_name} so could be weak for attacking. Should be care of sequrity, Only use inside of isolated network.

If you want to add books then you can just add books list and add folder in metaconfigs books.
You can check example.

you can also bind the ports

# Editor
it's basically use markdown editor. when you choose the book and the topic of book it will make md file and put in the book, fianlly it will be build and reserve again.

# Lisence 
All lisence is belong to me as 

// update시 타이틀 공백 수정 필요함.
// update시 commit로직빠짐 해당 로직 채울것,
// update 실패시 롤백 로직 없음
// create 실패시 클린업 로직 만들것
