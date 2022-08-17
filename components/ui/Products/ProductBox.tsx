import * as React from 'react';
import { IPost } from 'types';
import { CardBOx, CardBtn } from "./ProductBox.styles";

type Props = {
  item: IPost;
  addToCart: (id: number) => void
   
}
 

const ProductCom: React.FC<Props> =  ({ item, addToCart }) => {
  return (
    <CardBOx>
    <div key={item.id} className='CardBOx'>

      <div className='Card--body'>
      
      <img src={item.thumbnailUrl} />
      
        <p className='Card--body-text'>{item.title}</p>
      </div>
      <CardBtn>
      <button className='Card__button' onClick={() => addToCart(item.id)}>Add to Cart</button>
      </CardBtn>
    </div>
    </CardBOx>
  )
}

export default ProductCom
