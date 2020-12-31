import Card from '../Card';
import './styles.css';
const List = ({list, propToShow, onItemClick}) => {
  return (
    <div className="list">
      {list?.map((it, index)=>
        <Card key={index} onClick={()=>onItemClick(it)}>
          {it?.[propToShow]}
        </Card>
        )}
    </div>
  )
}

export default List;
