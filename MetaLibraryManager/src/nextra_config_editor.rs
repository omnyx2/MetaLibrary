use std::fs::{File, OpenOptions};
use std::io::{BufRead, BufReader, Write};
use std::path::Path;

pub fn edit_unique_tsx_file(file_path: &str, replace_for_unique: &str, new_unique_string: &str) -> std::io::Result<()> {
    // Open the file for reading
    let file = File::open(file_path)?;
    let reader = BufReader::new(file);
    
    // Collect all lines, modifying the line with `const baseUrl`
    let mut new_content = String::new();
    for line in reader.lines() {
        let mut line = line?;
        if line.contains(replace_for_unique) {
            // Modify the line as needed
            // line = line.replace(replace_for_unique, new_unique_string);  // Example modification
            line = new_unique_string.into();  // Example modification
        }
        new_content.push_str(&line);
        new_content.push('\n');
    }
    
    // Open the file for writing (truncate it first)
    let mut file = OpenOptions::new().write(true).truncate(true).open(file_path)?;
    file.write_all(new_content.as_bytes())?;
    
    Ok(())
}