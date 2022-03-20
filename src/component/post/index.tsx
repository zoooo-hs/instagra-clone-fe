import { Photo } from "../../model";
import { SquareImage } from "../common";

export function PhotoList(prop: {photos: Photo[], handleClick?: (index: number)=>void}) {
    const { photos, handleClick: callback } = prop;

    const handleClick = (index: number) => {
        if (callback === undefined) {
            return
        } else {
            return callback(index);
        }
    }

    return (
        <div className="post-photo-list">
            {photos.map((photo, index) => 
                <div className="post-photo" key={index}  onClick={() => {handleClick(index)}}>
                    <SquareImage src={photo.path} size={"500px"}/>
                </div>
            )}
        </div>
    )
}