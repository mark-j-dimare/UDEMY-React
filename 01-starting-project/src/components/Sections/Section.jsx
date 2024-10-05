// using ...props in this case exports all remaining props (can be named anything)
// this allows you to set things on the jsx component dynamically
// ex. id, className, onClick, ect.
export default function Section({ title, children, ...props }) {
    return (
        <section {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}