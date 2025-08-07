// Construct Tree from the given Level-order and In-order.
// Compute the Depth and Sum of the Deepest nodes in the Binary tree

// Input Format:
// -------------
// An integer N representing the number of nodes.
// A space-separated list of N integers representing the in-order traversal.
// A space-separated list of N integers representing the level-order traversal.

// Output Format:
// --------------
// Print two values:
// ->The maximum number of levels.
// ->The sum of all node values at the deepest level.

// Example:
// -------------
// Input:
// 11
// 7 8 4 2 5 9 11 10 1 6 3
// 1 2 3 4 5 6 7 9 8 10 11

// Output:
// 6 11

// Explanation:
// The binary tree structure:
//            1
//          /   \
//        2       3
//       / \     /
//      4   5   6
//     /     \   
//    7       9
//     \       \
//      8      10
//             /
//           11
// Maximum Depth: 6
// nodes at the Deepest Level (6): 11
// Sum of nodes at Level 6: 11
import java.util.*;
class Node{
    int data;
    Node left,right;
    Node(int d){
        data=d;
        left=null;
        right=null;
    }
}
public class p4 {
    public static void solve(int n,int in[],int level[]){
        HashMap<Integer,Integer> hm=new HashMap<>();
        for(int i=0;i<n;i++){ 
            hm.put(in[i],i);
        }
        Node root=construct(level,0,n-1,hm);
        int[] ans=depthAndSum(root);
        System.out.println(ans[0]+" "+ans[1]);

    }
    public static int[] depthAndSum(Node root){
        Queue<Node> q=new LinkedList<>();
        q.add(root);
        int d=0;
        int sum=0;
        while(!q.isEmpty()){
            int size=q.size();
            d++;
            sum=0;
            for(int i=0;i<size;i++){ 
                Node t=q.poll();
                sum+=t.data;
                if(t.left!=null) q.add(t.left);
                if(t.right!=null) q.add(t.right);
            }
        }
        return new int[]{d,sum};
    }
    public static Node construct(int level[],int start,int end,HashMap<Integer,Integer> hm)
    {
        if(start>end) return null;
        int root_value=-1;
        int root_index=-1;
        for(int x:level){
            if((hm.containsKey(x)) && hm.get(x)>=start && hm.get(x)<=end){
                root_index=hm.get(x);
                root_value=x;
                break;
            }
        }
        Node root=new Node(root_value);
        if(start==end) return root;
        root.left=construct(level,start,root_index-1,hm);
        root.right=construct(level,root_index+1,end,hm);
        return root;
    }
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int in[]=new int[n];
        for(int i=0;i<n;i++){ 
            in[i]=sc.nextInt();
        }
        int level[]=new int[n];
        for(int i=0;i<n;i++){ 
            level[i]=sc.nextInt();
        }
        solve(n,in,level);
    }
}
