/* eslint-disable */
import React from 'react'

const Breadcrumbs = ({ selectedBreed, resetList }) => {
  return (
    <div className="breadcrumbs">
      <nav className="breadcrumb">
        <ul>
          <li>
            {selectedBreed ? (
              <a onClick={resetList} href="#">
                &#8592; Back to all breeds
              </a>
            ) : (
              'Viewing all breeds'
            )}
          </li>
          {selectedBreed ? (
            <li className="is-active">
              <a aria-current="page" href="#">
                {selectedBreed.charAt(0).toUpperCase() +
                  selectedBreed.slice(1)}{' '}
                sub-breeds
              </a>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  )
}

export default Breadcrumbs
