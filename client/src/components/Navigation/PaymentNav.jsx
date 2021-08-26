import{useSelector} from 'react-redux'
import {Card, Avatar} from 'antd'
import moment from 'moment'



//  Destruct the state/ Will pass in a image later for use with future implementation
const {Meta} = Card
const PaymentNav = () => {
    const {auth} = useSelector((state) => ({...state})); 
    const {user} = auth;
    return (
        <div className="d-flex justify-content-around">
            <Card>
             {/* Destruct the state/ Will pass in a image later for use with future implementation */}
                <Meta avatar={user.firstname[0]} title={user.firstname} description={`Joined ${moment(user.CreatedAt).fromNow()}}`}/> 
             </Card>
        </div>
    )
};

export default PaymentNav