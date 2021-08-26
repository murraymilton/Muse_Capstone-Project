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
                <Meta avatar={<Avatar>{user.firstname[0]}</Avatar>} title={user.firstname} description={`Joined ${moment(user.CreatedAt).fromNow()}`}/> 
             </Card>
            { auth && auth.user && 
            auth.user.stripe_seller && 
            auth.user.stripe_seller.charges_enabled &&(<>
                <div>Pending balance</div>
                 <div>Payout settings</div>
             </>)}
        </div>
    )
};

export default PaymentNav