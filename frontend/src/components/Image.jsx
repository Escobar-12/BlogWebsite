import { IKImage } from 'imagekitio-react';

const Image = ({ path, className, w = 500, h = 500, alt })=>
{
    return (
        <IKImage 
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} 
            path={path} 
            alt={alt} 
            className={className} 
            loading='lazy' 
            lqip={{active:true, quality:20}}
            width={w}
            height={h}
            transformation={[
                { width: w, height: h, focus: "center" }
            ]}
        />
    );
}
export default Image;