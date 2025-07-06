const CalendarLegend: React.FC = () => {
  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-100 border border-green-200 rounded mr-2"></div>
          <span>Genehmigte Schulungen</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
          <span>Heute</span>
        </div>
      </div>
    </div>
  )
}

export default CalendarLegend 