import Image from "next/image"
import Link from "next/link"
import styles from '@/app/ui/dashboard/transactions/transactions.module.css'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import Search from "@/app/ui/dashboard/search/search"
import { Transaction } from "@/app/lib/models"
import { fetchTransactions } from "@/app/lib/data"
import { deleteTransaction } from "@/app/lib/actions"

const TransactionsPage = async ({searchParams}) => {
      const q = searchParams?.q || "";
      const page = searchParams?.page || 1;
      const { count, transactions } = await fetchTransactions(q, page);
      console.log(transactions)
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder={'search for a transaction'}/>
                <Link href="/dashboard/transactions/add">
                <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>User</td>
                        <td>Activity</td>
                        <td>Status</td>
                        <td>Time</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                        <td>
                            <div className={styles.trans}>
                                <Image src={transaction.author.img ||'/noavatar.png'} alt="" width={40} height={40}
                                className={styles.transImage}/>
                                {transaction.author.username}
                            </div>
                        </td>
                        <td>{transaction.activity}</td>
                        <td>{transaction.status}</td>
                        <td>{transaction.createdAt?.toString().slice(4,16)}</td>
                        <td>{transaction.amount}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href={`/dashboard/transactions/${transaction._id}`}>
                                <button className={`${styles.button} ${styles.view}`}>View</button>
                                </Link>
                                <form action={deleteTransaction}>
                                    <input type="hidden" name="id" value={transaction.id}/>
                                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Pagination count={count}/>
        </div>
    )
}

export default TransactionsPage;