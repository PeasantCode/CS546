const arr =["A B","C D"]
arr.sort((a,b)=>{
    const a_lastname = a.split(" ")[1]
    const b_lastname = b.split(" ")[1]
    return a_lastname-b_lastname;
})

const arr2 =[["A","B"],["C","D"]]
arr.sort((a,b)=>{
    return a[1]-b[1]
})
const full_name_list = arr2.map(name=>`${name[0]} ${name[1]}`)


const a  = ['aaa','bbb']
console.log(a.includes('aaa'));