import {onSnapshot} from "firebase/firestore";
import {dbProjects, dbTasks} from "@/firebase";

export default {
    state:{
        projects:{},
        tasks:{},
        activities:{},
        taskStatuses:['Backlog','ToDo','InProgress','Completed']
    },
    mutations:{
        WriteProjects(state,projects){
            state.projects = projects
        },
        WriteTasks(state,tasks){
            state.tasks = tasks
        },
        WriteActivities(state,activities){
            state.activities = activities
        }
    },
    actions:{
        async GetProjects(context){
            let username = context.rootState.user.username
            onSnapshot(dbProjects,snapshot => {
                let docs = snapshot.docs
                let tempProjects = {}
                docs.forEach(project=>{
                    let data = project.data()
                    let myDetails = data.members.filter(member=>member.username === username)[0]
                    if(myDetails){
                        tempProjects[project.id] = {...project.data(),id:project.id}
                    }
                })
                context.commit('WriteProjects',tempProjects)
            })
        },
        async GetTasks(context){
            let username = context.rootState.user.username
            onSnapshot(dbTasks,snapshot => {
                let docs = snapshot.docs
                let tempTasks = {}
                docs.forEach(task=>{
                    task = {...task.data(),id:task.id}
                    if(!task.isDeleted){
                        tempTasks[task.id] = task
                    }
                })
                context.commit('WriteTasks',tempTasks)
            })
        }
    }
}
