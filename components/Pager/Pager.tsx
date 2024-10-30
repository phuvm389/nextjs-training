import router from 'next/router';
import React from 'react'

interface Ipager {
  path: string;
  currentPage: number;
  totalPage: number;
}

const Pager = ({path, currentPage, totalPage}:Ipager) => {
  let pager:any[] = [];
  for (let i = 1; i <= totalPage; i++) {
    const lastNum = i % 10;
    if (i == 1 || i == 10) {
      pager.push(i);
    }
    if (currentPage < 3 && i > 1 && i <= 5) {
      pager.push(i);
    }
    if (i == currentPage - 3) {
      pager.push('...');
    }
    if (i >= currentPage - 2 && i < currentPage + 3 && !pager.includes(i)) {
      pager.push(i);
    }
    if (i == currentPage + 3) {
      pager.push('...');
    }
    if (!pager.includes(i) && i <= totalPage && lastNum == 0) {
      pager.push(i);
    }
  }
  return (
    <div>
      <button
        onClick={() => router.push(`${path}/${currentPage - 1}`)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pager.length > 0 &&
        pager.map((page) => {
          return (
            <button
              onClick={() => router.push(`${path}/${page}`)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          );
        })}
       <button
          onClick={() => router.push(`${path}/${currentPage + 1}`)}
          disabled={currentPage === totalPage}
        >
          Previous
        </button>
    </div>
  )
}

export default Pager
