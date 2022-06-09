import './styles/add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, nextCellId }) => {
  const { insertCellBefore } = useActions();

  return (
    /* forceVisible helps to show the code and text buttons when there are no visible cells */

    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is is-primary is-small"
          onClick={() => insertCellBefore(nextCellId, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is is-primary is-small"
          onClick={() => insertCellBefore(nextCellId, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
