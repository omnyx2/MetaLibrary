mod supercommand;
mod jsoneditor;
mod blogthemeeditor;
use serde_json::Value;
use std::fs;
use std::io::{self};
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
    let template_docs_path = "../book-template";
    let template_prefix = "../library/books/book-";

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

            // Read the JSON file
            let mut json = jsoneditor::read_json_file(&new_path)?;
            
            // Update the "start" script
            let _ = jsoneditor::update_start_script(&mut json, &format!("next start -p {port}"));

            // Write the updated JSON back to the file
            let _ = jsoneditor::write_json_file(&new_path, &json)?;
         }   
    }

    for item in &books {
        for (key, _value) in item {
            let file_path = format!("{template_prefix}{key}/theme.config.tsx"); // Replace with the actual path to your JS file
            blogthemeeditor::replace_string_in_file(&file_path, "DUM_DEV", key)?;
         }   
    }

 
    Ok(())
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


    //     if let Some(obj) = json.as_object() {
//         Ok(obj.clone().into_iter().collect())
//     }
//     let mut lookup: HashMap<String, Value> = serde_json::from_str(json).unwrap();

//     println!("{:?}", lookup);
//     // let huhu: HashMap<String,Value> = json[0].clone().as_object().unwrap().clone();
//     // assert_eq!(*library.get("1").unwrap(), json!(65));

//     // let Some(jarray)  = json.as_array() else { todo!() };
//     // let book_list: Vec<&str> = getBookListFromJson(json.clone());
//     // let dict_arr = json[0].as_object().unwrap();
//     // println!("{:?}");

//     // getBookListFromJson(json.clone());
//     let print_json: String = serde_json::to_string_pretty(&json).unwrap();
//     // println!("{:?}",array);
//     // check_dirs(paths_to_check);
//     Ok(())
// }

// fn json_to_hashmap(json: &str, keys: Vec<&str>) -> Result<HashMap<String, Value>> {
//     let mut lookup: HashMap<String, Value> = serde_json::from_str(json).unwrap();
//     let mut map = HashMap::new();
//     for key in keys {
//         let (k, v) = lookup.remove_entry (key).unwrap();
//         map.insert(k, v);
//     }
//     Ok(map)


// fn getBookListFromDictArray(dict_array: Value)   {
//     let mut book_list: Vec<&str> = vec![];
//     let i = 0;

//     // loop {
//     //     // let (key, value): (std::string::String, Value) = dict_arr[i];
//     //     println!("{:?} : {:?}",key,value.as_u64().unwrap());
//     //     // book_list.push(&key);
//     //     if i > dict_arr.len() {
//     //         break;
//     //     }
//     // }   
//     // book_list
//     // book_list
// }

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

// fn readJson(json_file_path: &str) -> Result<Value, Error> {
//     // Read the JSON file
//     let mut temp: String = json_file_path.into();
//     let mut contents = fs::read_to_string(&mut temp).unwrap();
//     // Parse the JSON content
//     let json: Value = from_str(&contents).unwrap();
//     Ok(json)
// }

// fn isJsonArray(json:Value) -> Result<Value, Error> {
//     if let Some(array) = json.as_array() {
//         Ok(json)
//     } else {
//         println!("The JSON content is not an array.");
//         Err(Error)
//      }
// }

// // fn findMissing(target: Vec<Value>, checker: Vec<&str>) -> Result<Vec<&str>, Error> {  
// //     // Check for the keys in the array
    
// //     for (index, item) in target.iter().enumerate() {
// //         if let Some(obj) = item.as_object() {
// //             let missing_keys: Vec<&str> = checker.iter()
// //                 .filter(|&&key| !obj.contains_key(key))
// //                 .copied()
// //                 .collect();
// //             if missing_keys.is_empty() {
// //                 println!("Object at index {} contains all keys.", index);
// //                 return Ok(missing_keys);
// //             } else {
// //                 println!("Object at index {} is missing keys: {:?}", index, missing_keys);
// //                 return Ok(missing_keys);
// //             }
// //         } else {
// //             println!("Item at index {} is not an object: {:?}", index, item);
// //         }
// //     }
// //     return Ok([""]);
// // }

// // fn callPath() -> vec!<String> {
// //     return [];
// // }

// // fn checkJsonAndDo(json_path: &Path, check_method: i32) -> io::Result<(), Err> {

// //     let template_json_path = json_path;
// //     let key_to_check = "specific_key";

// //     for json_path_str in json_paths_to_check {
// //         let json_path = Path::new(json_path_str);
// //         if !json_path.exists() {
// //             println!("JSON file {:?} does not exist. Something Wrong..", json_path);
// //             return Err(())
// //         } else {
// //             let mut file = fs::File::open(json_path)?;
// //             let mut contents = String::new();
// //             file.read_to_string(&mut contents)?;

// //             let json: Value = from_str(&contents)?;
// //             if let Some(array) = json.as_array() {
// //                 if !array.iter().any(|item| item.as_object().map_or(false, |obj| obj.contains_key(key_to_check))) {
// //                     println!("Key '{}' not found in any object of {:?}. Copying template...", key_to_check, json_path);
// //                     // fs::copy(template_json_path, json_path)?;
// //                 } else {
// //                     println!("Key '{}' exists in at least one object of {:?}.", key_to_check, json_path);
// //                 }
// //             } else {
// //                 println!("JSON in {:?} is not an array. Copying template...", json_path);
// //                 // fs::copy(template_json_path, json_path)?;
// //             }
// //         }
// //     }

// //     Ok(())
// // }

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

 