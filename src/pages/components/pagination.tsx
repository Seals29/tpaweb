import style from "@/styles/homes.module.css"
export default function Pagination({ currentPage, totalPages, onPageChange }: any): any {
  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(
      <li key={i} className={`${i === currentPage ? style.useritemactive : ''}`}>
        <button className={style.pagelink} onClick={() => onPageChange(i)}>
          {i}
        </button>
      </li>
    );
  }
  return (
    <nav>
      <ul className={style.paginate}>
        <li className={`${currentPage === 1 ? style.useritemdisabled : ''}`}>
          <button className={style.pagelink} onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
        {pageLinks}
        <li className={`${currentPage === totalPages ? style.useritemdisabled : ''}`}>
          <button className={style.pagelink} onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}