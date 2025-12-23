

const HelpPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold uppercase">Trung tâm trợ giúp</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Trợ giúp</h2>
          <ul className="list-disc pl-4">
            <li>Trợ giúp 1</li>
            <li>Trợ giúp 2</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Hỗ trợ khách hàng</h2>
          <ul className="list-disc pl-4">
            <li>Hỗ trợ khách hàng 1</li>
            <li>Hỗ trợ khách hàng 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
