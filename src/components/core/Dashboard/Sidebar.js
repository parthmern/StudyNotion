import React, { useState } from "react";

import {sidebarLinks as LINKS} from "../../../data/dashboard-links";
import {logout} from "../../../services/authAPI" ;
import { useDispatch, useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfiramtionModal from "../../common/ConfirmationModa";
import IconBtn from "../../common/IconBtn";
import CTAButton from "../../../components/core/HomePage/Button";


const Sidebar = () => {

    const {user, loading, profileLoading} = useSelector((state)=> state.profile) ;
    const {loading: authLoading} = useSelector((state)=> state.auth) ;

    const dispatch = useDispatch();
    const naviagte = useNavigate ();
    const [confirmationModal , setConfirmationModal] = useState(null);

    if(profileLoading || authLoading){

        return(
            <div>
                <span className="loader"></span>
            </div>
        )
    }

    console.log("LINKS==>",LINKS);

    return(
        <>
            
            <div className="flex min-w-[222px] flex-col border-r-[1px]  border-richblack-700 h-[calc(100vh - 3.5rem)] bg-richblue-800 py-10" >

                <div className="flex flex-col">
                    {
                        LINKS.map((link, index)=>{
                            if(link.type && user?.accountType !== link.type){

                                console.log("link.type and user?.accountType", link.type, user?.accountType);
                                console.log("link.type", link.type);

                                return null;
                            }
                            console.log("link=", link);
                            return(
                                <SidebarLinks key={link?.id} iconName={link?.icon} link={link} />
                            )
                        })
                    }
                </div>

                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 " >
                    <div className="flex flex-col">
                        <SidebarLinks link={{name:"Settings", path:"dashboard/settings"}}  iconName="VscSettingsGear"/>
                    </div>

                    <button
                    onClick={()=>{
                        setConfirmationModal(
                            {
                                text1 : "Are You Sure ?",
                                text2 : "You will be logged out",
                                btn1Text : "Logout",
                                btn2Text : "Cancel",
                                btn1Handler : () => dispatch(logout(naviagte)),
                                btn2Handler : () => setConfirmationModal(null),
                            }
                        )
                    }}
                    className="text-sm font-medium text-richblack-300 "
                    />

                    <div className="flex text-center text-[13px] px-6 py-2 hover:cursor-pointer hover:scale-95 transition-all duration-200 rounded-md font-bold bg-yellow-50 text-black items-center gap-x-2 justify-center">
                        <VscSignOut className="text-lg" />

                        <span>Logout</span>
                    </div>


                </div>

            </div>  

            {confirmationModal && <ConfiramtionModal modalData={confirmationModal} /> }

        </>
    )
}

export default Sidebar ;
