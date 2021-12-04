import { usePagination, DOTS } from "../hooks/usePagination"
import './pagination.scss'
const Pagination = ({
    onPageChange,
    totalData,
    siblingCount = 1,
    currentPage,
    pageInData,

}) => {

    const paginationRange = usePagination({
        currentPage,
        pageInData,
        totalData,
        siblingCount
    })

    if ( currentPage === 0 || paginationRange.length < 2){
        return null
    }

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1)
    }

    let lastPage = paginationRange[paginationRange.length - 1]

    return (
        <ul
        className='pagination-container'
      >
        
        {currentPage !==1 && <li
          className='pagination-item'
          onClick={onPrevious}
        >
            Previous
         
        </li>}
        {paginationRange.map(pageNumber => {
           
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }
          
          return (
            <li
              className={currentPage === pageNumber ? 'pagination-item selected' : 'pagination-item'}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}

      
        {lastPage !== currentPage && <li
          className='pagination-item'
          onClick={onNext}
        >
            Next
        </li>}
      </ul>
    )
}
export default Pagination