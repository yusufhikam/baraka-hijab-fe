import { useState } from 'react'
import Button from '../components/elements/Button/Button'
import H1 from '../components/elements/Title Header/H1'
import useDarkMode from '../utililties/customHook/useDarkMode'
import TransactionsLayout from '../components/layouts/TransactionsPage/TransactionsLayout'
import TransactionsHistoryLayout from '../components/layouts/TransactionsPage/TransactionHistoryLayout'

const TransactionsPage = () => {
    const { isDarkMode } = useDarkMode()
    const [activeSection, setActiveSection] = useState<
        'transactionsLayout' | 'transactionsHistoryLayout'
    >('transactionsLayout')
    return (
        <div
            className={`w-full p-5 md:p-10 ${isDarkMode ? '' : 'bg-gray-300'}`}
        >
            <div
                className={`rounded-sm p-5 ${isDarkMode ? 'bg-zinc-700' : 'bg-white'}`}
            >
                <div className="text-center md:text-left">
                    <H1>TRANSACTIONS</H1>
                </div>

                <div className="font-poppins-semibold z-0 mt-20 flex items-end justify-center overflow-hidden text-sm sm:text-base md:mt-15">
                    <Button
                        type="button"
                        variant={` p-2  transition-all duration-200  
                            ${
                                activeSection === 'transactionsLayout'
                                    ? 'h-13 bg-yellow-500 rounded-t-md shadow-lg shadow-black/80  text-black'
                                    : `h-10 border-t border-l rounded-tl-md hover:h-11 `
                            }`}
                        onClick={() => setActiveSection('transactionsLayout')}
                    >
                        Transactions
                    </Button>
                    <Button
                        type="button"
                        variant={`p-2  transition-all duration-300  
                            ${
                                activeSection === 'transactionsHistoryLayout'
                                    ? 'h-13 bg-yellow-500 rounded-t-md shadow-lg shadow-black/80  text-black'
                                    : `h-10  border-t border-r rounded-tr-md hover:h-11 ${isDarkMode && 'text-white'}`
                            }`}
                        onClick={() =>
                            setActiveSection('transactionsHistoryLayout')
                        }
                    >
                        Transaction History
                    </Button>
                </div>
                <div className="relative z-10 w-full overflow-hidden border">
                    {activeSection === 'transactionsLayout' && (
                        <TransactionsLayout />
                    )}

                    {activeSection === 'transactionsHistoryLayout' && (
                        <TransactionsHistoryLayout />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionsPage
