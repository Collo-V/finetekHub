function writeMsg(message){
    return
    `
        <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            box-sizing: border-box;
        }
        .body,.footer,.header-link{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            /* padding: 10px; */
        }
        .body{
            min-height: calc(100vh - 100px);
            padding-top: 40px;
            background: #66e1ff;
            flex-direction: column;
        }
        .footer{
            background: #262162;  
            height: 100px;  
            justify-items: end;        
        }
        .footer-content{
            border:solid #838388;
            border-width: 1px 0;
            width: 70%;
        }
        .content{
            background: white;
            border-radius: 10px;
            padding: 10px 40px;
            min-height: 300px;
            width: 50%;
        }
        .message-cont{
            font-size: 18px;
            margin-top: 10px;
        }
        .message-cont p{
            margin-top: 10px;
        }
        .header-link{
            height: 64px;
            display: flex;
            font-size: 32px;
            color: #66e1ff;
            text-decoration: none;
        }
        .header-link img{
            margin-right: 10px;
            height: 40px;
            width: auto;
        }
        @media (max-width=576px){
            .content{width: 100%;}
        }
    </style>
</head>
<body>
    <div class="body">
        <div class="content">
            <a href="http://fineteklabs.com" target="_blank" class="header-link">
                <img src="https://firebasestorage.googleapis.com/v0/b/new-finetek.appspot.com/o/company%2FiconColored%402x.png?alt=media&token=0702689d-d0e4-4a95-bb7c-0896b859aacb" alt="fineteklabs logo">
                <span>Fineteklabs</span>
            </a>
            <div class="message-cont">
               <p> We got your mesage</p>
               <p>${message.replaceAll('\n','<br>')}</p>
               <p>
                Best regards <br>
                Fineteklabs
               </p>
               
            </div>
        </div>
    </div>
    <div class="footer"></div>
    
</body>
</html>
        `

}
export {
    writeMsg

}
