import React, { useCallback } from "react";
import { useDispatch } from "react-redux";



const FILTERS_BTN = [
  {
    text: 'All',
    id: 'all'
  },
  {
    text: 'Active',
    id: 'active'
  },
  {
    text: 'Completed',
    id: 'completed'
  }
]

type Props = {
  count: number,
  activeFilter: string;
  completedCount: number
  filterChange: (id: string) => any
}

const Footer: React.FC<Props> = ({ count, activeFilter, completedCount, filterChange }) => {
  const dispatch = useDispatch()

  const clearCompeted = useCallback(() => {
    // dispatch(deleteAllTasks())
  }, [dispatch])



  return (
    <footer className="footer">
      <span className="todo-count">
        {`${count} ${count === 1 ? 'item' : 'items'} left`}
      </span>

      <ul className="filters">
        {FILTERS_BTN.map(({ text, id }) => (
          <li key={id}>
            <a
              href={`#/${id}`}
              className={id === activeFilter ? 'selected' : ''}
              onClick={() => {filterChange(id)}}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
      { completedCount > 0 && (<button
        type="button"
        className="clear-completed"
        onClick={clearCompeted}
      >
        Clear completed
      </button>)}
    </footer >
  )
}

export default React.memo(Footer)
