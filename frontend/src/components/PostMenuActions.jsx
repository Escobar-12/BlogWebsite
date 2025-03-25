import { MdBookmarkBorder } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const MenuActions = ()=>
{
    return(
        <div className="flex flex-col">
            <div className="flex items-center cursor-pointer py-2 text-sm gap-2">
                <MdBookmarkBorder className="text-3xl"/>
                <span>Save this Post</span>
            </div>
            <div className="flex items-center cursor-pointer py-2 text-sm gap-2">
                <MdDelete className="text-3xl"/>
                <span>Delete this Post</span>
            </div>
        </div>
    );
}
export default MenuActions;