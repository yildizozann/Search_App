import { useMemo } from "react"


export const DOTS = '...'

const customRange = (start, end) => {
    let length = end - start + 1
    return Array.from({length}, (_, i )=> i + start )
}

export const usePagination = ({
    totalData,
    pageInData,
    siblingCount = 1,
    currentPage
}) => {
    const paginationRange = useMemo(() => {
        const totalPage = Math.ceil(totalData/pageInData)
        const totalPageNumber = siblingCount + 5;

        if(totalPageNumber >= totalPage){
            return customRange(1, totalPage)
        }

        const leftSiblingIndex =Math.max(currentPage- siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage)

        const leftDots = leftSiblingIndex > 2;
        const rightDots = rightSiblingIndex < totalPage - 2;
    
        const firstPageIndex = 1;
        const lastPageIndex = totalPage;

        if (!leftDots && rightDots) {
            let leftItemCount = 3 + 2 * siblingCount
            let leftRange = customRange(1, leftItemCount)
      
            return [...leftRange, DOTS, totalPage]
        }

        if(leftDots && !rightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = customRange(totalPage - rightItemCount + 1, totalPage)

            return [firstPageIndex, DOTS, ...rightRange]

        }

        if(leftDots && rightDots) {
            let middleRange = customRange(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }
        

    }, [totalData, pageInData, siblingCount, currentPage])

    return paginationRange
}