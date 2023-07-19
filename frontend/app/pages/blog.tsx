

export default function Blog ({users}){
    return (
        <ul>
            {
                users.map((user, i)=>{
                    <li key={i}>{user.name}</li>
                })
            }
        </ul>
    )
}

export async function getStaticProps(){

    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await res.json()

    return {
        props:{
            users
        }
    }

}