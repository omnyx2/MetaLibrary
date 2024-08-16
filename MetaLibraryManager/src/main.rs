mod supercommand;
mod jsoneditor;
mod blogthemeeditor;
mod metaformat_article;
mod nextra_config_editor;

use serde_json::Value;
use std::fs::{self, File};
use std::io::{self, BufReader, Read};
use std::collections::HashMap;
use std::path::Path;
use std::process::Command;
// use std::env;

fn clean_up(src: &String) {
    // println!("{src}");
    // let output = Command::new("ls")
    //     .arg("-l")
    //     .arg("-a")
    //     .spawn()
    //     .expect("ls command failed to start");
    // dbg![output];
    println!(" remove un nesrray file  {src}/node_modules");
    let _output = Command::new(format!("rm"))
        .arg("-rf")
        .arg(format!("{src}/node_modules"))
        .output()
        .expect("Failed to execute command");
}
 
// fn sh_excute(src: &String) {
//     println!("install npm packages  {src}/");
//     let output0 = Command::new(format!("chmod"))
//         .arg("+x")
//         .arg(format!("{src}/initbook.sh"))
//         .output()
//         .expect("Failed to execute command");
//     println!("status: {}", output0.status);

//     let output1 = Command::new(format!("{src}/initbook.sh"))
//         .output()
//         .expect("Failed to execute command");
//     println!("status: {}", output1.status);

//     let output2 = Command::new(format!("rm"))
//         .arg(format!("{src}/initbook.sh"))
//         .output()
//         .expect("Failed to execute command");
// }


// fn book_table_creation(json_path) {
//     // let json: &str = &fs::read_to_string(&json_path).expect("Unable to read file");
//     // let books: Vec<HashMap<&str, Value>> = serde_json::from_str(json)?;
//     // for  item in &books {
//     //     for (key, value) in item {
//     //         let newPath: String =  format!("{template_prefix}{key}").to_string();
//     //         &paths_to_check.push(newPath);
//     //         value["tables"]
//     //     }     
//     // }
// }



fn main() -> io::Result<()> {
    
    let json_path = "../metaconfigs/book/config.json";
    let meta_data_path = "../md-writer/public/metadata_articles";
    let article_path = "../md-writer/public/articles";
    let book_article_path = "pages/";
    let template_docs_path = "../book-template";
    let template_prefix = "../library/books/book-";
    let md_writer_url = "http://localhost:3000";
    let mut paths_to_check: Vec<String> = vec![
        "../metaconfigs/book".into(),
        "../md-writer/metaconfigs/book".into(),
        // Add more paths as needed
    ];
    
    // 초기의 book shele에 대한 메타데이터를 읽어서 이를 저장하고 관리할 계획이다.
    let json: &str = &fs::read_to_string(&json_path).expect("Unable to read file");
    let books: Vec<HashMap<&str, Value>> = serde_json::from_str(json)?;
    for  item in &books {
        for (key, _value) in item {
            let new_path: String =  format!("{template_prefix}{key}").to_string();
            let _ = &paths_to_check.push(new_path);
        }     
    }
    // 아래의 모든 요소는 초기화로부터 구동된다.
    // book template로 부터 책을 생성한다. 이는 초기화에서만 구동한다.
    // dbg![&paths_to_check];
    let missing_paths = check_dirs(&paths_to_check);
    for missing_path in &missing_paths {
        let src = Path::new(&template_docs_path);
        let _ = copy_dir(src, Path::new(missing_path));
        let _ =clean_up(missing_path);
        // install_packages(missing_path);
    }

    // libraray의 books의 pages 폴더 아래에 book를 생성하고 관리한다.
    for item in &books {
        for (key, _value) in item {
            let str_arr: Vec<String> =  serde_json::from_str(&serde_json::to_string(&_value["topics"]["tables"]).unwrap()).unwrap();
            let _ = mkdir_missing_folders_in_books_list(str_arr, format!("{template_prefix}{key}/pages/"));
        }   
    }

    // book의 생성이 완료되었다면 book을 배포할 port를 할당한다.
    for item in &books {
        for (key, _value) in item {
            let new_path: String =  format!("{template_prefix}{key}/package.json").to_string();
            let port: i32 =  serde_json::from_str(&serde_json::to_string(&_value["port"]).unwrap()).unwrap();

            // Read the JON file
            let mut json = jsoneditor::read_json_file(&new_path)?;
            
            // Update the "start" script
            let _ = jsoneditor::update_start_script(&mut json, &format!("next start -p {port}"));
            let _ = jsoneditor::update_dev_script(&mut json, &format!("next dev -p {port}"));

            // Write the updated JSON back to the file
            let _ = jsoneditor::write_json_file(&new_path, &json)?;
         }   
    }

    for item in &books {
        for (key, _value) in item {
            let new_path: String =  format!("{template_prefix}{key}/theme.config.tsx").to_string();
            // Read the JON file
            nextra_config_editor::edit_unique_tsx_file(&new_path, &format!("const baseUrl = '{md_writer_url}'"), &format!("        const baseUrl = '{md_writer_url}?bookTitle={key}'"));
            nextra_config_editor::edit_unique_tsx_file(&new_path, &format!(" link: '{md_writer_url}'"), &format!("    link: '{md_writer_url}?bookTitle={key}',"));
        }  

    }

    for item in &books {
        for (key, _value) in item {
            let file_path = format!("{template_prefix}{key}/theme.config.tsx"); // Replace with the actual path to your JS file
            blogthemeeditor::replace_string_in_file(&file_path, "DUM_DEV", key)?;
         }   
    }

    let mata_data_of_articles = read_dict_json_files_from_directory(&meta_data_path).unwrap();
    let bookpages = construct_meta_data(mata_data_of_articles);
    for (key, _value) in &bookpages {
        for page in _value {
            
            let src_str = format!("{article_path}/{}.mdx",page.getId());
            let file_str = format!("{template_prefix}{key}/{book_article_path}{}/{}.mdx", page.getTopic(), page.getTitle()); // Replace with the actual path to your JS file
            let src_path = Path::new(&src_str);
            let file_path = Path::new(&file_str);

            let _ = copy_file(src_path, file_path);
        }
    }
    Ok(())
}

fn book_id_to_mdx(id: String) -> String {
    format!("{id}.mdx")
}

// topics 전달이 되면 만듦
fn mkdir_missing_folders_in_books_list(book_list_to_check: Vec<String>, base_path: String) -> Vec<String> {
    let mut missing_topic : Vec<String> = vec![];
    for topic in &book_list_to_check {
        // let src = Path::new(&template_docs_path);
        let new_path: String =  format!("{base_path}{topic}").to_string();
        missing_topic.push(new_path)
    }
    let folders_underpath = check_dirs(&missing_topic);
    for missign_dir in &folders_underpath {
        let _ = create_folder(&missign_dir);
        println!("Create folder at {missign_dir}");
    }
    folders_underpath
}

fn create_folder(path: &str) -> io::Result<()> {
    fs::create_dir_all(path)?;
    Ok(())
}

//  존재하지 않는 폴더의 리스트를 돌려준다. 입력은 폴더의 이름이 아니라 폴더의 경로가 주어져야 한다.
fn check_dirs(paths_to_check: &Vec<String>) -> Vec<String> {
    let mut missing_paths: Vec<String> = vec![];
    for path_str in paths_to_check {
        let path = Path::new(&path_str);
        if !path.exists() {
            missing_paths.push(path_str.clone());
            // println!("Directory {:?} does not exist. Copying template...", path);
        }
        // else {
        //     println!("Directory {:?} already exists.", path);
        // }
    }
    missing_paths
}

fn copy_dir(src: &Path, dst: &Path) -> io::Result<()> {
    if !dst.exists() {
        fs::create_dir_all(dst)?;
    }

    for entry in fs::read_dir(src)? {
        let entry = entry?;
        let src_path = entry.path();
        let dst_path = dst.join(entry.file_name());

        if src_path.is_dir() {
            copy_dir(&src_path, &dst_path)?;
        } else {
            fs::copy(&src_path, &dst_path)?;
        }
    }
    Ok(())
}

// 결국 해야하는 것은 메타데이터쪽을 읽어들이고, 파일의 메타데이터 특성에 따라 분류하여
// 배열을 반환하는 로직을 구성하는 것

// 여기서 핵심은 어떤 함수를 어떤 절차로 어떻게 구성하는지를 결정하는 방법이 Meta Data를 
// 다루기 위한 & 이해하기 위한  핵심이 될 듯하.
fn read_dict_json_files_from_directory(directory: &str) -> Result<Vec<metaformat_article::ArticleMetaData>, Box<dyn std::error::Error>> {
    let mut metadata_list = Vec::new();

    for entry in fs::read_dir(directory)? {
        let entry = entry?;
        let path = entry.path();

        if path.is_file() && path.extension().map_or(false, |ext| ext == "json") {
            let file = File::open(&path)?;
            let reader = BufReader::new(file);
            let metadata: metaformat_article::ArticleMetaData = serde_json::from_reader(reader)?;
            metadata_list.push(metadata);
        }
    }

    Ok(metadata_list)
}

fn construct_meta_data(files: Vec<metaformat_article::ArticleMetaData>) -> HashMap<String, Vec<metaformat_article::ArticleMetaData>> {
    let mut classified_files: HashMap<String, Vec<metaformat_article::ArticleMetaData>> = HashMap::new();

    for file in files {
        classified_files
            .entry(file.bookTitle.clone())
            .or_insert_with(Vec::new)
            .push(file);
    }
    classified_files
}

fn replace_spaces_with_hyphens(input: &str) -> String {
    input.replace(' ', "-")
}

fn copy_file(src: &Path, dst: &Path) -> io::Result<()> {
    // 경로체크는 없다 경로 체크를 해야한다면 에러를 터트려라
    if !src.exists() {
        return Err(io::Error::new(io::ErrorKind::NotFound, "Source file does not exist"));
    }

    // Check if the entry is a file
    if src.is_file() {
        if file_contents_are_different(&src, &dst)? || !dst.exists() {
            fs::copy(&src, &dst)?;
            dbg!("Copying articles from meta data: { } : { }", src, dst );
        }
    }
    Ok(())
}

fn file_contents_are_different(src: &Path, dst: &Path) -> io::Result<bool> {
    // Check if destination file exists
    if !dst.exists() {
        return Ok(true); // If the destination file does not exist, they are different
    }

    // Open source and destination files
    let mut src_file = fs::File::open(src)?;
    let mut dst_file = fs::File::open(dst)?;

    let mut src_contents = Vec::new();
    let mut dst_contents = Vec::new();

    // Read contents of the source file
    src_file.read_to_end(&mut src_contents)?;
    // Read contents of the destination file
    dst_file.read_to_end(&mut dst_contents)?;

    // Compare the contents
    Ok(src_contents != dst_contents)
}

 
