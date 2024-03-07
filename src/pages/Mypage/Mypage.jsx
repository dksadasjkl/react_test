/** @jsxImportSource @emotion/react */
import * as S from "./style";
import { useEffect, useRef, useState } from "react";
import WideButton from "../../components/WideButton/WideButton";
import { useInput } from "../../hooks/useInput";
import defaultProfile from "../../assets/images/profile/default.jpeg"


/**
 * 
 * 1. 이미지 클릭시 이미지 변경가능해야함.
 * 2. 수정하기 버튼 클릭시 localStorage에 key: user value: JSON데이터
 *  {
 *      nickname: "테스트계정",
 *      namd: "김준일",
 *      birthday: "1994-09-07",
 *      imgUrl: ""
 *  }
 *  저장되어야하고 페이지 로드시 불러와야함.
 * 3. RootHeader의 프로필 이미지도 변경되어야함.
 */


function Mypage(props) {
    const imgRef = useRef();
    const [ nicknameValue, handleNicknameOnChange ] = useInput();
    const [ nameValue, handleNameOnChange ] = useInput();
    const [ birthdayValue, handleBirthdayOnChange ] = useInput();
    const [ profileUrl, setProfileUrl ] = useState(defaultProfile);
    const [ userDatas, setUserDatas ] = useState({});

    
    // 2번
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const userData = !storedUser ? {} : JSON.parse(storedUser);
        setUserDatas(userData);
        setProfileUrl(!userData.imgUrl ? defaultProfile : userData.imgUrl );
    }, []);   
 

    // 1번
    const handleChangeProfileUrl = (e) => {
        const fileReader = new FileReader();

            if(e.target.files.length === 0 ) {
                return;
            }

            fileReader.onload = (e) => {
                setProfileUrl(e.target.result);
            };
            
            fileReader.readAsDataURL(e.target.files[0]);
         
    };


    // 2번
    const handleUpload = () => {
        const userData = {
            nickname: nicknameValue,
            namd: nameValue,
            birthday: birthdayValue,
            imgUrl: profileUrl
        }
        localStorage.setItem("user", JSON.stringify(userData));
    };

    return (
        <div css={S.layout}>
            <div css={S.imageBox}>
                <img src={profileUrl} alt="" onClick={() => imgRef.current.click()}/>
                <input type="file" style={{display: "none"}} multiple={true} ref={imgRef} onChange={handleChangeProfileUrl}/>
            </div>
            <input css={S.inputBox} type="text" placeholder="닉네임" value={nicknameValue} onChange={handleNicknameOnChange}/>
            <input css={S.inputBox} type="text" placeholder="이름" value={nameValue} onChange={handleNameOnChange}/>
            <input css={S.inputBox} type="text" placeholder="생년월일" value={birthdayValue} onChange={handleBirthdayOnChange}/>
            <WideButton text={"수정하기"} onClick={handleUpload}/>
        </div>
    );
}

export default Mypage;