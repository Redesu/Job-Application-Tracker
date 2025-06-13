import Button from "./Button";
export default function pagination({ page, totalPages, onPageChange }) {


    const handlePrev = () => onPageChange(Math.max(1, page - 1));
    const handleNext = () => onPageChange(Math.min(totalPages, page + 1));

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            <Button onClick={handlePrev} disabled={page === 1}>Previous</Button>
            {Array.from({ length: totalPages }, (_, idx) => (
                <Button
                    key={idx + 1}
                    variant={page === idx + 1 ? "edit" : "default"}
                    onClick={() => onPageChange(idx + 1)}
                    style={{ minWidth: 36, fontWeight: page === idx + 1 ? 'bold' : 'normal' }}
                >
                    {idx + 1}
                </Button>
            ))}
            <Button onClick={handleNext} disabled={page === totalPages}>Next</Button>
        </div>
    )
}
