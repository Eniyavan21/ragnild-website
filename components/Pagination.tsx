'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5; // Maximum number of page buttons to show

        if (totalPages <= maxVisible) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Calculate range around current page
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust range if near the start or end
            if (currentPage <= 3) {
                end = 4;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - 3;
            }

            // Add ellipsis before range if needed
            if (start > 2) {
                pages.push('...');
            }

            // Add page numbers in range
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add ellipsis after range if needed
            if (end < totalPages - 1) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
            {/* Previous Button */}
            {currentPage > 1 ? (
                <Link
                    href={`${baseUrl}?page=${currentPage - 1}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:border-[#3054fd] hover:text-[#3054fd] hover:bg-blue-50 transition-all"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Link>
            ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-300 cursor-not-allowed">
                    <ChevronLeft className="w-5 h-5" />
                </div>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="flex items-center justify-center w-10 h-10 text-gray-400"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <Link
                            key={pageNum}
                            href={`${baseUrl}?page=${pageNum}`}
                            className={`
                                flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all
                                ${
                                    isActive
                                        ? 'bg-[#3054fd] text-white shadow-lg shadow-blue-500/30'
                                        : 'border border-gray-200 text-gray-600 hover:border-[#3054fd] hover:text-[#3054fd] hover:bg-blue-50'
                                }
                            `}
                            aria-label={`Page ${pageNum}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {pageNum}
                        </Link>
                    );
                })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages ? (
                <Link
                    href={`${baseUrl}?page=${currentPage + 1}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:border-[#3054fd] hover:text-[#3054fd] hover:bg-blue-50 transition-all"
                    aria-label="Next page"
                >
                    <ChevronRight className="w-5 h-5" />
                </Link>
            ) : (
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-300 cursor-not-allowed">
                    <ChevronRight className="w-5 h-5" />
                </div>
            )}
        </nav>
    );
}
