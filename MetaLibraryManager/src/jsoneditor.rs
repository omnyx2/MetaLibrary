use serde_json::Value;
use std::io::{self, Read, Write };
use std::fs::File;

pub fn read_json_file(file_path: &str) -> io::Result<Value> {
    let mut file = File::open(file_path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    let json: Value = serde_json::from_str(&contents)?;
    Ok(json)
}

pub fn write_json_file(file_path: &str, json: &Value) -> io::Result<()> {
    let mut file = File::create(file_path)?;
    let contents = serde_json::to_string_pretty(json)?;
    file.write_all(contents.as_bytes())?;
    Ok(())
}

pub fn update_start_script(json: &mut Value, new_command: &str) {
    if let Some(scripts) = json.get_mut("scripts") {
        if let Some(start) = scripts.get_mut("start") {
            *start = Value::String(new_command.to_string());
        }
        if let Some(start) = scripts.get_mut("dev") {
            *start = Value::String(new_command.to_string());
        }
    }
}

// //참고하기에 좋은 json enum 사용방식(공부용)
// fn readable_json(json_file_path: &str) -> io::Result<JsonType> {
//     // Read the JSON file
//     let mut file = File::open(json_file_path)?;
//     let mut contents = String::new();
//     file.read_to_string(&mut contents)?;

//     // Parse the JSON content
//     let json: Value = from_str(&contents)?;

//     // Determine the type of JSON and convert accordingly
//     if let Some(obj) = json.as_object() {
//         Ok(JsonType::Object(obj.clone().into_iter().collect()))
//     } else if let Some(arr) = json.as_array() {
//         Ok(JsonType::Array(arr.clone()))
//     } else {
//         Ok(JsonType::Other(json))
//     }
// }