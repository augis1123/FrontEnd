import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protected(props) {

    let Cmp=props.cmp
    let role = props.role

    const navigate = useNavigate()

    useEffect(() => {
        let userRoles = localStorage.getItem("roles");
        if(userRoles == null)
        {
            navigate("/404")
            return
        }
            
        if (!userRoles.includes(role)) {
            navigate("/404")
        }
    })

    return (
        <div>
            <Cmp />
        </div>
    )
}
