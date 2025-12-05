import { addTransactions } from "@/app/lib/actions";
import styles from '@/app/ui/dashboard/transactions/addTransaction/addTransaction.module.css'

const addTransactionPage = () => {
    return (
        <div className={styles.container}>
            <form className={styles.form} action={addTransactions}>
                <input type="text" placeholder="username" name="author"/>
                <input type="text" placeholder="status" name="status"/>
                <input type="text" placeholder="activity" name="activity"/>
                <input type="number" placeholder="amount" name="amount"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default addTransactionPage;