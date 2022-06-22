import React from "react";

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
}

export const Footer: React.FC<Props> = ({ count, activeFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {`${count} items left`}
      </span>

      <ul className="filters">
        {FILTERS_BTN.map(({ text, id }) => (
          <li key={id}>
            <a
              href={`#/${id}`}
              className={id === activeFilter ? 'selected' : ''}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer >
  )
}