import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  interface User {
    id: number | string 
    name: string
    age: number | string
    email: string
  }

  let url = "http://localhost:3001/data"
  let [data, setData] = useState<User[]>([])


  let [addName, setAddName] = useState("")
  let [addAge, setAddAge] = useState("")
  let [addEmail, setAddEmail] = useState("")
  let [addModal, setAddMod] = useState(false)
  let [editName, setEditName] = useState("")
  let [editAge, setEditAge] = useState("")
  let [editEmail, setEditEmail] = useState("")
  let [editModal, setEditMod] = useState(false)


  async function get() {
    try {
      let { data } = await axios.get<User[]>(url)
      setData(data)
    } catch (error) {
      console.error(error)

    }
  }


  async function deleteUser(id: string | number) {
    try {
      await axios.delete(`${url}/${id}`)
      get()
    } catch (error) {
      console.error(error)

    }
  }




  async function addUser(user: User) {
    try {
      await axios.post(url, user)
      get()
    } catch (error) {
      console.error(error)

    }
  }

  async function editUser(id: string | number) {
    try {
      await axios.put(`${url}/${id}`, { name: editName, age: editAge, email: editEmail })
      get()
    } catch (error) {
      console.error(error)
    }
  }






  useEffect(() => {
    get()
  }, [])


  return (
    <>
      <button onClick={() => setAddMod(true)}>Add</button>
      {
        data.map((el) => (
          <table key={el.id}>
            <tr>
              <td>{el.name}</td>
              <td>{el.age}</td>
              <td>{el.email}</td>
              <button onClick={() => deleteUser(el.id)}>Delete</button>
              <button>Edit</button>
            </tr>
          </table>
        ))
      }


      {
        addModal ? <div>
          <input type="text" value={addName} onChange={(e) => setAddName(e.target.value)} />
          <input type="text" value={addAge} onChange={(e) => setAddAge(e.target.value)} />
          <input type="text" value={addEmail} onChange={(e) => setAddEmail(e.target.value)} />
          <button onClick={() => addUser({ name: addName, age: addAge, email: addEmail, id: `${Date.now()}` })}>Add</button>
          <button onClick={() => setAddMod(false)}>Close</button>
        </div> : false
      }

      {
        editModal ? <div>
          <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
          <input type="text" value={editAge} onChange={(e) => setEditAge(e.target.value)} />
          <input type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
          <button>Edit</button>
          <button onClick={() => setEditMod(false)}>Close</button>
        </div> : false
      }



    </>
  )
}

export default App
