import React from "react"
import Button from "../../common/components/Button"
import Form from "../../common/components/Form"
import TextBox from "../../common/components/TextBox"
import style from "../../common/style"

const WindsorWithdrawalForm = (props) => {
  const [amount, setAmount] = React.useState(0)
  const [balance, setBalance] = React.useState(0)

  return (
    <div className={style("p-6").card()}>
      <div className="pb-1 text-slate-700 text-lg">
        Your Wallet balance is{" "}
        <span className="font-extrabold text-slate-900">${balance}</span>
      </div>
      <div className="pb-4 text-slate-700 text-xs italic">
        Minimum withdrawal must be $10
      </div>
      <Form onSubmit={onSubmit}>
        <div className={style("grid grid-cols-1 md:grid-cols-2 gap-4")}>
          <TextBox
            disabled={!balance || balance < 10}
            label="Amount"
            type="number"
            value={amount}
            max={balance}
            min={10}
            onChange={(amount) => setAmount(+amount)}
          />
          <div className="flex justify-center items-center">
            <Button
              color="blue"
              type="submit"
              disabled={
                !balance ||
                !amount ||
                amount < 10 ||
                balance < 10 ||
                balance < amount
              }
            >
              Request Withdrawal
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default WindsorWithdrawalForm
