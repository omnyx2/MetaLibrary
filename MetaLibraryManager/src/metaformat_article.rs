use serde::Deserialize;
use std::collections::HashMap;
use serde::de::Error;
use serde::Deserializer;

#[derive(Debug, Deserialize)]
pub struct ArticleMetaData {
    pub bookTitle: String,
    contributors: Vec<String>,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    coverage: String,
    creator: String,
    date: String,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    dateIssued: String,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    description: String,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    format: String,
    identifier: String,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    language: String,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    publisher: String,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    relation: String,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    rights: String,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    source: String,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    subject: String,
    title: String,
    #[serde(deserialize_with = "deserialize_string_or_default")]
    bookType: String,
    #[serde(deserialize_with = "deserialize_topic_or_default")]
    topic: String,
    version: String
}

// 사용자 지정 deserializer를 사용하여 빈 문자열을 기본값으로 처리
fn deserialize_string_or_default<'de, D>(deserializer: D) -> Result<String, D::Error>
where
    D: Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    if s.is_empty() {
        Ok("default_value".to_string()) // 빈 문자열일 경우 기본값을 반환
    } else {
        Ok(s)
    }
}

fn deserialize_topic_or_default<'de, D>(deserializer: D) -> Result<String, D::Error>
where
    D: Deserializer<'de>,
{
    let s = String::deserialize(deserializer)?;
    if s.is_empty() {
        Ok("/".to_string()) // 빈 문자열일 경우 기본값을 반환
    } else {
        Ok(s)
    }
}

impl ArticleMetaData {
    // Create a new Processor with the initial input
    pub fn getId(&self) -> String {
        self.identifier.clone()
    }
    pub fn getTopic(&self) -> String {
        self.topic.clone()
    }
    pub fn getTitle(&self) -> String {
        // self.title.clone()
        replace_spaces_with_hyphens(&self.title.clone())
    }
}

fn replace_spaces_with_hyphens(input: &str) -> String {
    input.replace(' ', "-")
}


// struct Processor {
//     input: String,
// }

// impl Processor {
//     // Create a new Processor with the initial input
//     fn new(input: &ArticleMetaData) -> Self {
//         Processor {
//             input: input.to_string(),
//         }
//     }

//     // Method to add a process function to the chain
//     fn apply(mut self, process: ProcessFn) -> Self {
//         self.input = process(self.input);
//         self
//     }

//     // Method to get the final result after applying all processes
//     fn result(self) -> String {
//         self.input
//     }
// }
