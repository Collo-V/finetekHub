import {QuillEditor,Quill} from "@vueup/vue-quill";
import Inline from 'quill/blots/inline'
class Mention extends Inline {
    static formats(node) {
        // if(node.classList.contains('mentions')){
        //   node.classList.remove('bg-primary','px-1','mentions');
        //   return node
        // }
        node.classList.add('bg-primary','px-1','mentions','cursor-pointer','dropdown-cont');
        return node

    }
}
Mention.blotName = 'mention';
Mention.tagName = 'span';
Mention.className = 'mentions'
Quill.register(Mention)

export {Quill,QuillEditor}
