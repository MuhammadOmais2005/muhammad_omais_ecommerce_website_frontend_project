const PakistanCurrency = ({amount})=>{
    const formatter = new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
      });
    const result = formatter.format(amount);
    return (
        <>
            <span>{result}</span>
        </>
    )
}
export default PakistanCurrency;

