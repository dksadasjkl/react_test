/** @jsxImportSource @emotion/react */
import WideButton from "../../components/WideButton/WideButton";
import * as S from "./style";
import React, { useEffect, useRef, useState } from 'react';

/**
 *  1. 사진 등록하기를 통해 등록된 이미지들을 각자 자유롭게 디자인하여 불러와야함.
 *  2. localStorage에 저장된 사진이 없으면 
 *      <h1>불러올 사진이 없습니다.<h1>
 *      문구가 중앙에 나오도록해야함.
 */


function PhotoAlbum() {
    const imgRef = useRef();
    const loadImageId = useRef(0);
    const [ loadImages, setLoadImages ] = useState([]);

    useEffect(() => {
        setLoadImages(!localStorage.getItem("images") 
            ? []
            : JSON.parse(localStorage.getItem("images")));
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
            localStorage.setItem("images", JSON.stringify(promise));
        });
    }
    
    return (
        <div css={S.layout}>
            {!localStorage.getItem("images")
                ? <h1 css={S.h1Css}>불러올 사진이 없습니다.</h1>
                : loadImages.map(loadImage =>
                    <div css={S.imgLayout} key={loadImage.id}>
                        <img src={loadImage.imageUrl} alt="" />
                    </div>
                )
            }
            <input type="file" style={{display: "none"}} multiple={true} ref={imgRef} onChange={handleChangeInput}/>
            <WideButton text={"사진 등록하기"} onClick={() => imgRef.current.click()}/>
        </div>
    );
}

export default PhotoAlbum;