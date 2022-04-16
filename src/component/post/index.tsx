import {TailSpin} from "react-loader-spinner";
import {Photo} from "../../model";

export const POST_PAGE_SIZE = 8

export function PhotoList(prop: {photos: Photo[], handleClick?: (index: number) => void, loading?: boolean}) {
    const {photos, handleClick: callback, loading} = prop;

    const handleClick = (index: number) => {
        if (callback === undefined) {
            return
        } else {
            return callback(index);
        }
    }


    if (loading !== undefined && loading) {
        return (
            <div style={{"margin": "100px"}}>
                <TailSpin
                    height={"300px"}
                    width={"300px"}
                    color={"black"}
                    ariaLabel={"이미지 프로세싱 중 ..."}
                />
            </div>
        )
    } else {
        return (
            <div className="post-photo-list">
                {photos.map((photo, index) =>
                    <div className="post-photo" key={index} onClick={() => {handleClick(index)}}>
                        <img src={photo.path} alt="" className="post-img" />
                    </div>
                )}
            </div>
        )
    }
}
