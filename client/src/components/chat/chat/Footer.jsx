import { useEffect , useState} from "react";
import Picker from "emoji-picker-react";
import { EmojiEmotions, AttachFile, Mic } from "@mui/icons-material";
import { Box, styled, InputBase } from "@mui/material";

import { uploadFile } from "../../../service/api";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  border-radius: 18px;
  background-color: #ffffff;
  width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  padding-left: 25px;
  font-size: 14px;
  height: 20px;
  width: 100%;
`;

const ClipIcon = styled(AttachFile)`
  transform: "rotate(40deg)";
`;

const Footer = ({ sendText, value, setValue, setFile, file, setImage }) => {
    const[showPicker,setShowPicker]=useState(false);
    const[inputStr,setInputStr]=useState('');

    useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setImage(response.data);
      }
    };
    getImage();
  }, [file]);

  const onFileChange = (e) => {
    setValue(e.target.files[0].name);
    setFile(e.target.files[0]);
  };
   
  const onEmojiClick=(event,emojiObject)=>{
    setInputStr(prevInput=>prevInput+emojiObject.emoji);
    setShowPicker(false);   
  }

  return (
    <Container>
      <EmojiEmotions/>     
      <label htmlFor="fileInput">
        <ClipIcon />
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => onFileChange(e)}
      />

      <Search>
        <InputField
          placeholder="Type a message"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setInputStr(e.target.value)}
          onKeyPress={(e) => sendText(e)}
          inputStr={inputStr}
        />
      </Search>
      <Mic />
    </Container>
  );
};

export default Footer;
