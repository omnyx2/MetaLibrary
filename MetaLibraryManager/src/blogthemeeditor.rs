use std::fs::File;
use std::io::{self, Read, Write};
use std::path::Path;

pub fn read_file(file_path: &str) -> io::Result<String> {
    let mut file = File::open(file_path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

pub fn write_file(file_path: &str, contents: &str) -> io::Result<()> {
    let mut file = File::create(file_path)?;
    file.write_all(contents.as_bytes())?;
    Ok(())
}

pub fn replace_string_in_file(file_path: &str, target: &str, replacement: &str) -> io::Result<()> {
    let mut contents = read_file(file_path)?;
    contents = contents.replace(target, replacement);
    write_file(file_path, &contents)?;
    Ok(())
}
 