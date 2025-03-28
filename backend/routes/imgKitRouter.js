import express from "express";
import  ImageKit from 'imagekit';

const router = express.Router();
const imagekit = new ImageKit({
    urlEndpoint:"https://ik.imagekit.io/zvk2bqqlk/",
    publicKey: 'public_FdHfK7G+IU72rIhgniEYB3S//8M=',
    privateKey: 'private_z62nGs+vAw+1Ysz+eWKJwwmeAdg='
});


router.get("/",(req,res)=>
{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

export default router;
