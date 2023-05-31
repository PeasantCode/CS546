def calculate(x, y, operation: str):
    op = [lambda x, y: x + y, lambda x, y: x - y, lambda x, y: x * y]
    op_str = ["+", "-", "*"]
    idx = op_str.index(operation)
    return op[idx](x, y)

res1=calculate(3,4,"+")
print(res1)