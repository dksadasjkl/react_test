/** @jsxImportSource @emotion/react */
import * as S from "./style";
import React, { useEffect, useRef, useState } from 'react';
import WideButton from "../../components/WideButton/WideButton";

/**
 *  1. 사진 불러오기 버튼을 클릭 후 5개 이상의 이미지를 불러올 수 있어야함.
 *  2. PromiseAll을 사용하여 이미지를 순서대로 불러와야함.
 *  3. 불러오기가 완료되면 "이미지를 저장하시겠습니까?" 라는 확인 취소 메세지 창이 떠야함.
 *  4. 확인 클릭시 localStorage에 key: photo, value: JSON 데이터
 *      [
 *          {
 *              id: 1,
 *              imageUrl: ""
 *          },
 *          {
 *              id: 2,
 *              imageUrl: ""
 *          }
 *      ]
 *      형식으로 저장되어야함.
 *  5. 취소시 저정되면 안됨.
 */

function PhotoRegister() {
    const imgRef = useRef();
    const loadImageId = useRef(0);
    const [ loadImages, setLoadImages ] = useState([]);

    useEffect(() => {
        setLoadImages(!localStorage.getItem("photo") 
            ? []
            : JSON.parse(localStorage.getItem("photo")));
    }, []);

    const handleChangeInput = (e) => {
        const loadFiles = Array.from(e.target.files);
        
        if(loadFiles.length === 0) {
            imgRef.current.value = "";
            return;
        }

        let promises = [];
        
        promises = loadFiles.map(file => new Promise((resolve) => {
            const loadImage = {
                id: loadImageId.current += 1,
                imageUrl: ""
            }
            const fileReader = new FileReader();
    
            fileReader.onload = (e) => {
                resolve({
                    ...loadImage,
                    imageUrl: e.target.result
                });
            } 

            fileReader.readAsDataURL(file);
        }))
        Promise.all(promises)
        .then(promise => {
            setLoadImages(promise);
            if(window.confirm("이미지를 저장하시겠습니까?")) {
                localStorage.setItem('photo', JSON.stringify(promise));
                alert("저장되었습니다.");
            } else {
                alert("저장이 취소되었습니다.");
            }
            imgRef.current.value = "";
        });
    }

    return (
        <div css={S.layout}>
            <h1 css={S.title}>사진 등록하기</h1>
            {localStorage.getItem("photo") && loadImages.map(loadImage =>
                    <div css={S.imgLayout} key={loadImage.id}>
                        <img src={loadImage.imageUrl} alt="" />
                    </div>
                )
            }
            <input type="file" style={{display: "none"}} multiple={true} ref={imgRef} onChange={handleChangeInput}/>
            <WideButton text={"사진 불러오기"} onClick={() => imgRef.current.click()}/>
        </div>
    );
}

export default PhotoRegister;