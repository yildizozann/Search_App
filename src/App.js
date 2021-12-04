
import './styles/App.scss';
import './styles/ShowMore.scss'
import { useMemo, useState } from 'react';
import userData from './USERS.json'
import { ReactComponent as Logo } from './logo.svg';
import Pagination from './components/Pagination';
import className from "classname";

let PageSize = 6;

function App() {
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [mainPageData, setMainPapeData] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [showContent, setShowContent] = useState(false)




  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filtered.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filtered]);

  const searchClass = className('main_container', { 'after_click': (currentTableData.length !== 0 && showMore) === true })
  const handleSearchInput = (event) => {
    setSearch(event.target.value)
  }

  const handleSearchClick = (event) => {
    event.preventDefault();
    const filterData = userData.data.filter(value => value[0].toLowerCase().includes(search.toLowerCase()))
    setShowContent(true)
    if (showMore) {
      setShowMore(false)
    }
    if (!search) {
      setFiltered([]);
    } else {
      setFiltered(filterData)
      setMainPapeData(filterData.slice(0, 3))
    }

  }
  const handlePaginationClick = () => {

    setShowMore(true)
    setShowContent(false)
  }


  return (
    <div className={searchClass}>
      <Logo className='logo'></Logo>
      <form className='search' onSubmit={handleSearchClick}>
        <input
          className='search_input'
          onChange={handleSearchInput}
          type="text"
          required
        />
        <input className='search_btn' type="submit" value="SEARCH" />

        {(showContent && filtered.length !== 0) &&
          <div className='first_table'>
            {mainPageData.map((el, i) => {
              return (
                <div key={i}>
                  <div className='table1'>
                    <div className='first_col' >
                      <p className='city'>{el[4]} - {el[5]} </p>
                      <p className='name'> {el[0]} - {el[3].slice(6,10)} </p>
                    </div>
                    <div className='secon_col'>
                      <p className='email'>Email: {el[2]}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
            {filtered.length !== 0 && <button className='show_more' onClick={handlePaginationClick}> Show more...</button>}
          </div>}

      </form>

      {(currentTableData.length !== 0 && showMore) &&

        <div className='second_table'>

          {currentTableData.map((el, i)=> {
            return (

              <div key={i}>
                <div className='table2' >
                  <div className='first_col'>
                    <p className='city' >{el[4]} - {el[5]} </p>
                    <p className='name'> {el[0]} - {el[3].slice(6,10)} </p>
                  </div>
                  <div className='secon_col'>
                    <p className='email'>Email: {el[2]}</p>
                  </div>
                </div>
                <hr />
              </div>

            );
          })}

          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalData={filtered.length}
            pageInData={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
      }

    </div>
  );
}

export default App;

