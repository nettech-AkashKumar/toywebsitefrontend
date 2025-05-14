const TotalSalesCard = ({ totalSales, title = "Total Sales" }) => {
  return (
    <>
      <div className="card text-center p-3 shadow-sm">
        <h5>{title}</h5>
        <h4>${totalSales.toLocaleString()}</h4>
      </div>
    </>
  );
};

export default TotalSalesCard;
