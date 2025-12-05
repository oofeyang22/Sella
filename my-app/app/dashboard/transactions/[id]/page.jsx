import { updateTransaction } from "@/app/lib/actions";
import { fetchTransaction } from "@/app/lib/data";
import { Transaction } from "@/app/lib/models";
import styles from "@/app/ui/dashboard/transactions/singleTransaction/singleTransaction.module.css"
import Image from "next/image";

const singleTransactionPage = async({params}) => {
    const { id } = await params;
    const transaction = await fetchTransaction(id)
    console.log({id, params})
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/file.png" alt="" fill/>
                </div>
                <p className={styles.align}>{transaction.author.username}</p>

            </div>
            <div className={styles.formContainer}>
                <form className={styles.form} action={updateTransaction}>
                  <input type="hidden" name="id" value={transaction.id}/>
                  <label>Username</label>
                <input type="text" placeholder={transaction.author.username} name="author"/>
                <label>Status</label>
                <input type="text" placeholder={transaction.status} name="status"/>
                <label>Activity</label>
                <input type="text" placeholder={transaction.activity} name="activity"/>
                <label>Amount</label>
                <input type="number" placeholder={transaction.amount} name="amount"/>
                <button>Update</button>
                </form>
            </div>
        </div>
    )
}
export default singleTransactionPage;