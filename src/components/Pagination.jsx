import React from 'react';


function Pagination({ totalProducts, limit, offset, setOffset }) {

  const currentPage = (offset / limit) + 1;
  const lastPage = Math.ceil(totalProducts / limit);

  function handleFirst() {
    setOffset(0);
  }
  function handlePrevious() {
    if (offset >= limit)
      setOffset(prevOffset => prevOffset - limit);
  }
  function handleNext() {
    if (offset <= (totalProducts - limit))
      setOffset(prevOffset => prevOffset + limit);
  }
  function handleLast() {
    setOffset(limit * (lastPage - 1))
  }

  return (
    <>
      <p>Showing page {currentPage} of {lastPage}</p>

      <p>
        Showing products {limit * (currentPage - 1) + 1} to {' '}
        {currentPage === lastPage
          ? totalProducts
          : limit * currentPage
        }
        {' '} of {totalProducts} (total)
      </p>

      <div className="flex flex-row gap-4 mt-2">
        <button onClick={handleFirst}  className="w-8 h-7 bg-slate-800 flex items-center justify-center rounded-md">
          <span className="sr-only">First page</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>
        </button>

        <button onClick={handlePrevious} className="w-8 h-7 bg-slate-800 flex items-center justify-center rounded-md">
          <span className="sr-only">Previous page</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-6 h-6">
          <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </button>

        <button onClick={handleNext} className="w-8 h-7 bg-slate-800 flex items-center justify-center rounded-md">
          <span className="sr-only">Next page</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-6 h-6">
          <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
        </button>

        <button onClick={handleLast} className="w-8 h-7 bg-slate-800 flex items-center justify-center rounded-md">
          <span className="sr-only">Last page</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
          <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
        </button>
      </div>
    </>
  )
}

export { Pagination }